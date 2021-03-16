from django.db import models

# Create your models here.


class Book(models.Model):
    book_name = models.CharField("Name", max_length=200)
    author = models.CharField(max_length=200)
    ratings = models.PositiveIntegerField()
    reviews = models.CharField(max_length=500)
    published_date = models.DateField("Published Date", auto_now_add=True)

    def __str__(self):
        return self.book_name
