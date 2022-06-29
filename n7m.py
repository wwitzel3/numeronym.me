from pyodide import create_proxy

def generate_numeronym(document):
    def _gn(*args, **kwargs):
        input_value = document.getElementById("user-input").value
        first = input_value[0]
        last = input_value[-1]
        num = len(input_value[1:-1])
        output_value = f"{first}{num}{last}"
        document.getElementById("output-target").innerText  = output_value
    return create_proxy(_gn)

__all__ = ['generate_numeronym']