from random import shuffle
from graphene import List, Field, Int
from graphene_django import DjangoObjectType

from .models import Card, CardSet


class CardType(DjangoObjectType):
    class Meta:
        model = Card

class CardSetType(DjangoObjectType):
    class Meta:
        model = CardSet


class Query(object):
    all_cards = List(CardType)
    card = Field(CardType, id=Int())
    card_set = Field(CardSetType, id=Int())
    shuffled_cards = List(CardType, id=Int(required=True))
    players_card_set = List(CardSetType, num_of_players=Int(required=True))

    def resolve_card(self, info, **kwargs):
        id = kwargs.get('id')

        if id:
            return Card.objects.get(id=id)

    def resolve_all_cards(self, info, **kwargs):
        return Card.objects.all()

    def resolve_card_set(self, info, **kwargs):
        id = kwargs.get('id')

        return CardSet.objects.get(id=id)

    def resolve_shuffled_cards(self, info, **kwargs):
        id = kwargs.get('id')

        card_set = CardSet.objects.get(id=id)

        card_list = list(card_set.cards.all())
        shuffle(card_list)
        return card_list

    def resolve_players_card_set(self, info,**kwargs):
        num = kwargs.get('num_of_players')

        card_set_list = list(CardSet.objects.filter(number_of_players=num))
        return card_set_list
