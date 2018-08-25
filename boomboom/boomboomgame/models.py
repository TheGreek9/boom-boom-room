from django.db import models

color_choices = [('Red', 'Red'), ('Blue', 'Blue'),
                 ('Grey', 'Grey'), ('Green', 'Green'),
                 ('Purple', 'Purple')]


class Card(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    picture = models.ImageField(null=True)
    color = models.CharField(max_length=50, choices=color_choices)

    def __str__(self):
        return self.title


class CardSet(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=100, blank=True, null=True)
    number_of_players = models.IntegerField()
    cards = models.ManyToManyField(Card)

    def __str__(self):
        return self.name if self.name else "Card set from user {}".format(self.user_id)

    # def save(self, *args, **kwargs):
    #     if not self.number_of_players:
    #         self.number_of_players = self.cards.count()
    #
    #     super().save(self, *args, **kwargs)
