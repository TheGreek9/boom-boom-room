from django.contrib import admin

# Register your models here.

from .models import Card, CardSet

admin.site.register(Card)
admin.site.register(CardSet)