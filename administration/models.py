from django.contrib.auth.models import Group
from django.db import models


class CustomContentType(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class CustomField(models.Model):
    name = models.CharField(max_length=128)
    content_type = models.ForeignKey(CustomContentType)

    def __str__(self):
        return self.name


class CustomSite(models.Model):
    name = models.CharField(max_length=128)
    content_types = models.ManyToManyField(CustomContentType)
    groups = models.ManyToManyField(Group, blank=True)
    title_field = models.ForeignKey(CustomField, related_name='title_sites')
    filter_fields = models.ManyToManyField(CustomField, related_name='filter_sites', blank=True)
    setting_fields = models.ManyToManyField(CustomField, related_name='setting_sites', blank=True)
    summary_fields = models.ManyToManyField(CustomField, related_name='summary_sites', blank=True)
    sort_fields = models.ManyToManyField(CustomField, related_name='sort_sites', blank=True)

    def __str__(self):
        return self.name
