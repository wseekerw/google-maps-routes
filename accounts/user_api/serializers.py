from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from map_objects.api.serializers import MapObjectSerializer


# Token manual

from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name="api_users:user_detail")
    map_objects = MapObjectSerializer(many=True)
    class Meta:
        model = User
        fields = (
            'username',
            'id',
            #'url',
            'map_objects'

        )

class UserCreateSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(label='Email Adress')
    # email2 = serializers.EmailField(label='Confirm Email')
    password = serializers.CharField(label='Password', style={'input_type': 'password'})
    password2 = serializers.CharField(label='Confirm Password', style={'input_type': 'password'})
    class Meta:
        model = User
        fields = [
            'username',
            # 'email',
            # 'email2',
            'password',
            'password2',
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True}
        }

    def validate(self, data):
        username = data['username']
        user_qs = User.objects.filter(username=username)
        if user_qs.exists():
            raise ValidationError("This user allready exists.")
        return data
    """
    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get('email')
        email2 = value
        if email1 != email2:
            raise ValidationError('Emails must match!')
        user_qs = User.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError("This email is allready registered.")
        return value
    """
    def validate_password2(self, value):
        data = self.get_initial()
        password1 = data.get('password')
        password2 = value
        if password1 != password2:
            raise ValidationError('Passwords must match!')

    def create(self, validated_data):
        username = validated_data['username']
        #email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            #email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',

        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                        }

    def validate(self, data):
        username = data['username']
        password = data['password']
        user_a = User.objects.filter(username__iexact=username)
        user_b = User.objects.filter(email__iexact=username)
        user_qs = (user_a | user_b).distinct()
        if user_qs.exists() and user_qs.count() == 1:
            user_obj = user_qs.first()  # User.objects.get(id=1)
            password_passes = user_obj.check_password(password)
            if not user_obj.is_active:
                raise ValidationError("This user is inactive")
            # HTTPS
            if password_passes:
                # token
                data['username'] = user_obj.username
                # data['email'] = user_obj.email
                payload = jwt_payload_handler(user_obj)
                token = jwt_encode_handler(payload)
                data['token'] = token
                return data
        raise ValidationError("Unable to login with provided credentials!")

        # # email = data['email']
        # # user_qs = User.objects.filter(email=email)
        # # if user_qs.exists():
        # #     raise ValidationError("This user has already registered.")
        # return data