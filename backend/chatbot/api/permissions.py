from rest_framework.permissions import IsAuthenticated


class IsAdmin(IsAuthenticated):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_staff
