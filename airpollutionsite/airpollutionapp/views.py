from django.http import HttpResponse


def index(request):
    return HttpResponse("Heya, World! Let's make something beautiful.")