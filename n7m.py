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


def parts(word):
    """Split ``word`` into the letters a numeronym keeps and counts.

    ``kubernetes`` -> ``("k", "ubernete", "s")``; the middle is what the
    digit stands for. Words too short to abbreviate come back whole with
    nothing counted.
    """
    word = word.strip()
    if len(word) < 3:
        return (word, "", "")
    return (word[0], word[1:-1], word[-1])


def word_from_path(pathname):
    """Return the word encoded in a URL path (``/kubernetes`` -> ``kubernetes``).

    Lets ``numeronym.me/kubernetes`` pre-fill the generator. The root path
    carries no word and yields an empty string.
    """
    return unquote(pathname.strip("/"))


def generate_numeronym(document, input_value):
    """Render the numeronym and the letters it came from; hide it all for empty input."""
    result = numeronym(input_value)
    first, middle, last = parts(input_value)
    document.getElementById("output-target").innerText = result
    document.getElementById("part-first").innerText = first
    document.getElementById("part-middle").innerText = middle
    document.getElementById("part-last").innerText = last
    document.getElementById("result").classList.toggle("hidden", not result)


__all__ = ["numeronym", "parts", "word_from_path", "generate_numeronym"]
