from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Book
from .serializers import BookSerializer


@api_view(['GET', 'POST'])
def book_reviews(request):

    # to view all the data
    if request.method == 'GET':
        # if its a get request get all the objects for the book model
        data = Book.objects.all()

        # call the serializer to handle all the books we have
        serializer = BookSerializer(
            data, context={request: 'request'}, many=True)

        return Response(serializer.data)

    # when the rquest is POST
    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def book_details(request, pk):

    try:
        book = Book.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # if the method is PUT
    if request.method == "PUT":

        # calling the serializer with the book requested
        serializer = BookSerializer(
            book, data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # when the request is to delete the particular review
    elif request.method == "DELETE":
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
