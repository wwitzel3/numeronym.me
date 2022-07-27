def generate_numeronym(document, input_value):
    first = input_value[0]
    last = input_value[-1]
    num = len(input_value[1:-1])
    output_value = f"{first}{num}{last}"
    document.getElementById("output-target").innerText = output_value

__all__ = ['generate_numeronym']