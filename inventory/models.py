from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=32)
    purchase_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    sale_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)


class Stock(models.Model):
    product = models.ForeignKey(Product)
    quantity = models.IntegerField(default=0)


def create_stock_reference(instance, created, raw, **kwargs):
    if created:
        Stock.objects.create(product=instance)


models.signals.post_save.connect(create_stock_reference, sender=Product)