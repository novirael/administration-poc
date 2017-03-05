from rest_framework import routers

from administration.views import (
    ContentTypeViewSet,
    GroupViewSet,
    PermissionViewSet,
    SiteViewSet,
    UserViewSet,
)

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'sites', SiteViewSet)
router.register(r'permissions', PermissionViewSet)
router.register(r'content_types', ContentTypeViewSet, base_name='content_types')

urlpatterns = router.urls
