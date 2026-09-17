def numeronym(word):
    """Return the numeronym of ``word`` (kubernetes -> k8s).

    Words shorter than three characters have nothing to abbreviate and are
    returned unchanged; an empty string yields an empty string.
    """
    word = word.strip()
    if len(word) < 3:
        return word
    return f"{word[0]}{len(word) - 2}{word[-1]}"


def generate_numeronym(document, input_value):
    document.getElementById("output-target").innerText = numeronym(input_value)


__all__ = ["numeronym", "generate_numeronym"]
