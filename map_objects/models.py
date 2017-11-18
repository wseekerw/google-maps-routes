from django.db import models
from django.conf import settings

# Create your models here.

class MapObject(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='map_objects')
    address1 = models.CharField(max_length=50)
    lat1 = models.FloatField()
    lng1 = models.FloatField()
    address2 = models.CharField(max_length=50)
    lat2 = models.FloatField()
    lng2 = models.FloatField()

    def __str__(self):
        return self.address1
