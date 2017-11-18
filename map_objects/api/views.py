from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveDestroyAPIView
from rest_framework import permissions

from map_objects.models import MapObject
from .serializers import MapObjectSerializer, MapObjectCreateSerializer


class MapObjectListAPIView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MapObject.objects.all()
    serializer_class = MapObjectSerializer

    def get_queryset(self):
        """
        Filter for map objects query which
        return all objects only from authenticated user.
        """
        user = self.request.user
        return MapObject.objects.filter(user=user)

class MapObjectDetailAPIView(RetrieveDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MapObject.objects.all()
    serializer_class = MapObjectSerializer

    def get_queryset(self):
        user = self.request.user
        return MapObject.objects.filter(user=user)

class MapObjectCreateAPIVIew(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MapObject.objects.all()
    serializer_class = MapObjectCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)