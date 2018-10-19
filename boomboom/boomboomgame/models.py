from django.db import models

color_choices = [('Red', 'Red'), ('Blue', 'Blue'),
                 ('Grey', 'Grey'), ('Green', 'Green'),
                 ('Purple', 'Purple')]


class Card(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    picture = models.ImageField(null=True)
    card_swap = models.BooleanField(default=False)
    color = models.CharField(max_length=50, choices=color_choices)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']


class CardSet(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=100, blank=True, null=True)
    number_of_players = models.IntegerField()
    cards = models.ManyToManyField(Card, related_name='non_buried_cards')
    buried_cards = models.ManyToManyField(Card, related_name='buried_cards',
                                          blank=True)

    def __str__(self):
        return self.name if self.name else "Card set from user {}".format(self.user_id)