from rest_framework import generics, status
from rest_framework.response import Response

from accounts.models import BillingProfile
from chatbot.api.serializers import EditDocumentAISerializer
from chatbot.clients import Gemini
from documents.api.serializers import DocSerializer
from documents.models import DocAccess


class EditDocumentAIAPIView(generics.GenericAPIView):
    serializer_class = EditDocumentAISerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        obj = DocAccess.objects.filter(doc=self.kwargs['pk'], user=user)
        if obj.exists() and obj.first().can_edit:
            doc = obj.first().doc
            return Response(DocSerializer(doc).data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'You do not have permission to edit this document.'},
                            status=status.HTTP_403_FORBIDDEN)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        command = serializer.validated_data.get('command')
        user = request.user
        query = DocAccess.objects.filter(doc=self.kwargs['pk'], user=user)
        if query.exists() and query.first().can_edit:
            doc = query.first().doc
            prompt = f'''
            Original Story: {doc.content}
            
            
            User: {command}
            Rewrite the original story according to the the command of the user. Do not change the original story if not commanded to. Be creative to rewrite the story. Your response should be in bengali. Your response will be directly saved as the content of the existing document.
            '''

            response = Gemini().generate_response(prompt)
            doc.content = response
            doc.save()
            return Response(DocSerializer(doc).data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'You do not have permission to edit this document.'},
                            status=status.HTTP_403_FORBIDDEN)


class RefineDocumentAPIView(generics.RetrieveAPIView):
    serializer_class = EditDocumentAISerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        obj = DocAccess.objects.filter(doc=self.kwargs['pk'], user=user)

        if obj.exists() and obj.first().can_edit:
            # Deduct coins for the operation
            billing_profile, _ = BillingProfile.objects.get_or_create(user=user)
            if billing_profile.coins < 5:
                return Response(
                    {'detail': 'Insufficient coins to perform this action.'},
                    status=status.HTTP_402_PAYMENT_REQUIRED
                )
            billing_profile.coins -= 5
            billing_profile.save()

            # Prepare the document and prompt
            doc = obj.first().doc
            prompt = f'''Convert/Translate the following text to proper Bengali.

            Original Story: {doc.content}

            Return converted/translated text without any additional explanations or formatting.'''

            # Generate AI response
            response = Gemini().generate_response(prompt)

            # Post-process to ensure clean output
            converted_content = response.strip()

            # Save converted content
            doc.content = converted_content
            doc.save()

            return Response(DocSerializer(doc).data, status=status.HTTP_200_OK)

        else:
            return Response(
                {'detail': 'You do not have permission to edit this document.'},
                status=status.HTTP_403_FORBIDDEN
            )


