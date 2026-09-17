import unittest

from n7m import numeronym


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


if __name__ == "__main__":
    unittest.main()
