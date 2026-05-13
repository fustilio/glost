# Liturgical role is not folded into `glost-dialogue`

Call-and-response prayer structure (`leader | all | shared-response`) is structurally adjacent to dialogue's speaker attribution but semantically distinct: ritual fixed text, an "all" that isn't a named participant, irrelevant `emotion` taxonomy, and likely future extensions (antiphon, verse-response, preces) that don't belong in a conversation vocabulary. Liturgical role currently lives on the sentence in pharos-local `extras.liturgy.role`. If and when a second liturgical consumer appears, promote to a `glost-liturgy` sibling package — but do not collapse it into `glost-dialogue`.

What still applies regardless: role lives on the **sentence**, not on the **AlignmentEdge** (see ADR-0002). It's a property of the source utterance, not of any translation pair.
