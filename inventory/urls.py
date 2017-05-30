from rest_framework import routers

from inventory.views import ProductViewSet, StoreViewSet

router = routers.SimpleRouter()
router.register(r'products', ProductViewSet)
router.register(r'stock', StoreViewSet)
urlpatterns = router.urls
