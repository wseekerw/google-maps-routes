from django.conf.urls import url
from .views import MapObjectListAPIView, MapObjectCreateAPIVIew, MapObjectDetailAPIView




urlpatterns = [
    url(r'^$', MapObjectListAPIView.as_view(), name='map_object_list'),
    url(r'^create/$', MapObjectCreateAPIVIew.as_view(), name='map_object_create'),

    # detail and delete view
    url(r'(?P<pk>\d+)/$', MapObjectDetailAPIView.as_view(), name='post_detail'),
]