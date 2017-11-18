from rest_framework import serializers

from map_objects.models import MapObject

from django.contrib.auth import get_user_model
User = get_user_model()

class SmallUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username'
        ]


class MapObjectSerializer(serializers.ModelSerializer):
    user = SmallUserSerializer()
    class Meta:
        model = MapObject
        fields = [
            'id',
            'user',
            'address1',
            'lat1',
            'lng1',
            'address2',
            'lat2',
            'lng2'
        ]



class MapObjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapObject
        fields = [
            'address1',
            'lat1',
            'lng1',
            'address2',
            'lat2',
            'lng2'
        ]