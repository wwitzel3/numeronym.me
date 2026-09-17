from urllib.parse import unquote


def numeronym(word):
    """Return the numeronym of ``word`` (kubernetes -> k8s).

    Words shorter than three characters have nothing to abbreviate and are
    returned unchanged; an empty string yields an empty string.
    """
    word = word.strip()
    if len(word) < 3:
        return word
    return f"{word[0]}{len(word) - 2}{word[-1]}"


def word_from_path(pathname):
    """Return the word encoded in a URL path (``/kubernetes`` -> ``kubernetes``).

    Lets ``numeronym.me/kubernetes`` pre-fill the generator. The root path
    carries no word and yields an empty string.
    """
    return unquote(pathname.strip("/"))


def generate_numeronym(document, input_value):
    document.getElementById("output-target").innerText = numeronym(input_value)


__all__ = ["numeronym", "word_from_path", "generate_numeronym"]
