import unittest

from n7m import numeronym, parts, word_from_path


class NumeronymTests(unittest.TestCase):
    def test_known_numeronyms(self):
        self.assertEqual(numeronym("kubernetes"), "k8s")
        self.assertEqual(numeronym("internationalization"), "i18n")
        self.assertEqual(numeronym("localization"), "l10n")
        self.assertEqual(numeronym("numeronym"), "n7m")

    def test_empty_input_returns_empty(self):
        self.assertEqual(numeronym(""), "")

    def test_short_words_are_returned_unchanged(self):
        # Nothing to abbreviate: "a" must not become "a0a", "ab" must not become "a0b".
        self.assertEqual(numeronym("a"), "a")
        self.assertEqual(numeronym("ab"), "ab")
        self.assertEqual(numeronym("abc"), "a1c")

    def test_surrounding_whitespace_is_ignored(self):
        self.assertEqual(numeronym("  kubernetes\r"), "k8s")


class PartsTests(unittest.TestCase):
    def test_splits_into_first_middle_last(self):
        self.assertEqual(parts("kubernetes"), ("k", "ubernete", "s"))
        self.assertEqual(parts("abc"), ("a", "b", "c"))

    def test_short_words_have_no_middle(self):
        self.assertEqual(parts("ab"), ("ab", "", ""))
        self.assertEqual(parts(""), ("", "", ""))

    def test_surrounding_whitespace_is_ignored(self):
        self.assertEqual(parts("  kubernetes\n"), ("k", "ubernete", "s"))


class WordFromPathTests(unittest.TestCase):
    def test_root_path_has_no_word(self):
        self.assertEqual(word_from_path("/"), "")
        self.assertEqual(word_from_path(""), "")

    def test_single_segment_is_the_word(self):
        self.assertEqual(word_from_path("/kubernetes"), "kubernetes")

    def test_trailing_slash_is_ignored(self):
        self.assertEqual(word_from_path("/kubernetes/"), "kubernetes")

    def test_percent_encoding_is_decoded(self):
        self.assertEqual(word_from_path("/%C3%BCber"), "\u00fcber")


if __name__ == "__main__":
    unittest.main()
