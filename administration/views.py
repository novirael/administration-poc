from django.contrib.auth.models import User, Group, Permission
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response

from administration.models import CustomSite, CustomContentType
from administration.serializers import (
    ContentTypeSerializer,
    GroupSerializer,
    PermissionSerializer,
    SiteSerializer,
    UserSerializer,
)


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class PermissionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()


class SiteViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = CustomSite.objects.all()


class ContentTypeViewSet(viewsets.ViewSet):
    serializer_class = ContentTypeSerializer
    content_type_model = CustomContentType

    @staticmethod
    def _detailed_content_type(instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'fields': [
                field.name
                for field in instance.customfield_set.all()
            ]
        }

    def list(self, request):
        data = [
            self._detailed_content_type(content_type)
            for content_type in self.content_type_model.objects.all()
        ]
        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        content_type = get_object_or_404(self.content_type_model, pk=pk)
        data = self._detailed_content_type(content_type)
        serializer = self.serializer_class(data)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create(request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        content_type = get_object_or_404(self.content_type_model, pk=pk)
        content_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
