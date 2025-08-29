from django.db import models

# class for Products on the Bakery
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField(default=0)
    image_url = models.URLField(max_length=255, blank=True, null=True)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name
