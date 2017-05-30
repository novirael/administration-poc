from rest_framework import viewsets

from inventory.models import Product, Stock
from inventory.serializers import ProductSerializer, StockSerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class StoreViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    queryset = Stock.objects.all()
