from django.http import HttpResponse
from django.template import loader
import requests
from .models import Question
# Pandas
import pandas as pd
import numpy as np 


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('airpollutionapp/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))

def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def receive_data(req):
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt' 
    response = requests.get(url)
    # print(response.text)
    data = pd.read_csv(response.text)
    # print(data)
    return HttpResponse(str(data))
