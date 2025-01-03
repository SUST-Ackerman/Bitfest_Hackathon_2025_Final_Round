from django.db import models


class BillingProfile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    coins = models.PositiveIntegerField(default=200)
