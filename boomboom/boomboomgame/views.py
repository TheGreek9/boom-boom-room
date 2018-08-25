import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext, Template


def index(request):
    template = Template('{{ item }}')
    context = RequestContext(request, dict(
        item=dict(
            id='1',
            name='Bomber',
            color='red',
            description='testing this out'
        )
    ))
    return HttpResponse(template.render(context))
