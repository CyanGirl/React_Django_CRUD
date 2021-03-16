from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('pk', 'book_name', 'author',
                  'ratings', 'reviews', 'published_date')
