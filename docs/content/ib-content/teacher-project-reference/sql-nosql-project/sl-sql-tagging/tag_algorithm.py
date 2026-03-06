def generate_tags(text):
    stop_words = [
        "the", "a", "an", "to", "and", "for",
        "of", "in", "on", "at", "with"
    ]

    text = text.lower()
    words = text.split()

    filtered_words = []

    for word in words:
        word = word.strip(",.!?")

        if word not in stop_words:
            filtered_words.append(word)

    counts = {}

    for word in filtered_words:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1

    unique_words = []

    for word in counts:
        if counts[word] == 1:
            unique_words.append(word)

    max_tags = 3
    tags = unique_words[:max_tags]

    return tags
