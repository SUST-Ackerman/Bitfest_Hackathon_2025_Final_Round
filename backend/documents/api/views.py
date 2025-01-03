from rest_framework import generics, permissions

from documents.api.serializers import StorySerializer, DocAccessSerializer, DocSerializer
from documents.models import PDF, Doc, DocAccess


class StoryListAPIView(generics.ListCreateAPIView):
    queryset = PDF.objects.all()
    filterset_fields = ['is_public']
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        user_from_query = self.request.query_params.get('user')

        if user_from_query and user_from_query != user.username:
            return PDF.objects.filter(user__username=user_from_query, is_public=True)
        return PDF.objects.filter(user=user)


class DocListAPIView(generics.ListCreateAPIView):
    queryset = Doc.objects.all()
    serializer_class = DocSerializer
    permission_classes = [permissions.IsAuthenticated]


class DocAccessListAPIView(generics.ListCreateAPIView):
    serializer_class = DocAccessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DocAccess.objects.filter(user=self.request.user)


class DocDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DocSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Doc.objects.all()

    def get_object(self):
        return DocAccess.objects.get(doc=self.kwargs['pk'], user=self.request.user).doc
