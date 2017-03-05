from django.contrib.auth.models import User, Group, Permission
from rest_framework import serializers

from administration.models import CustomSite, CustomContentType, CustomField


class GroupSerializer(serializers.ModelSerializer):
    permissions = serializers.SlugRelatedField(
        many=True,
        slug_field='codename',
        queryset=Permission.objects.all()
    )

    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    user_permissions = serializers.SlugRelatedField(
        many=True,
        slug_field='codename',
        queryset=Permission.objects.all()
    )
    groups = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Group.objects.all()
    )

    class Meta:
        model = User
        fields = '__all__'


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name', 'codename')


class CustomRelatedField(serializers.SlugRelatedField):
    def __init__(self, **kwargs):
        super(CustomRelatedField, self).__init__(
            slug_field='name',
            queryset=CustomField.objects.all(),
            **kwargs
        )


class SiteSerializer(serializers.ModelSerializer):
    content_types = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=CustomContentType.objects.all()
    )
    groups = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Group.objects.all()
    )
    title_field = CustomRelatedField()
    filter_fields = CustomRelatedField(many=True)
    setting_fields = CustomRelatedField(many=True)
    summary_fields = CustomRelatedField(many=True)
    sort_fields = CustomRelatedField(many=True)

    class Meta:
        model = CustomSite
        fields = '__all__'


class ContentTypeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=128)
    fields = serializers.ListField(
        serializers.CharField(max_length=128)
    )

    def create(self, validated_data):
        content_type = CustomContentType.objects.create(
            name=validated_data['name']
        )
        if not validated_data.get('fields'):
            return

        CustomField.objects.bulk_create([
            CustomField(name=field_name, content_type=content_type)
            for field_name in validated_data['fields']
        ])
