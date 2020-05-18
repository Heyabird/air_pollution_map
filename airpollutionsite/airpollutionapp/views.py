from django.http import HttpResponse
from django.template import loader
import requests
from .models import Question
# import Pandas
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

# A bit of a brute force way to have 8 methods for 8 cities, so definitely try to find a more graceful way to pull in urls in 1 method :/ but for now, it will do...
def receive_data(req):
    print(req.GET['city'])
    # url = ''
    # response = requests.get(url)
    # # save city name
    # data = pd.read_csv(url, header=9, sep='\t|,', engine='python')
    # data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    # html = data.to_html()
    # return HttpResponse(html)

def receive_data_la(req):
    print(req)
    city = 'Los Angeles'
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/California/Los_Angeles.txt' 
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,', engine='python')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_json()
    return HttpResponse(html)

def receive_data_sd(req):
    print(req)
    response = requests.get('http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ California/San_Diego.txt')
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_ny(req):
    print(req)
    response = requests.get('http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_ America/New_York/New_York_City.txt' )
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_sf(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/local/United_States_of_America/ California/San_Francisco'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_nd(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/India/NCT/Delhi.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_bj(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/China/Beijing/Beijing.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_ho(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ Texas/Houston.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)

def receive_data_ch(req):
    print(req)
    url = 'http://berkeleyearth.lbl.gov/air-quality/maps/cities/United_States_of_America/ Illinois/Chicago.txt'
    response = requests.get(url)
    # save city name
    data = pd.read_csv(url, header=9, sep='\t|,')
    data = data.drop(data.columns[[1,2,3,5,6]], axis=1)
    html = data.to_html()
    return HttpResponse(html)
