from typing import Dict

RESOURCE_MAP = {

    # ---------------- Python ----------------

    "Variables": [
        {
            "title": "Python Variables",
            "url": "https://docs.python.org/3/tutorial/introduction.html"
        },
        {
            "title": "W3Schools Variables",
            "url": "https://www.w3schools.com/python/python_variables.asp"
        },
        {
            "title": "GeeksforGeeks Variables",
            "url": "https://www.geeksforgeeks.org/python-variables/"
        }
    ],

    "Input/Output": [
        {
            "title": "Python Input & Output",
            "url": "https://docs.python.org/3/tutorial/inputoutput.html"
        },
        {
            "title": "W3Schools Input",
            "url": "https://www.w3schools.com/python/ref_func_input.asp"
        }
    ],

    "Lists": [
        {
            "title": "Python Lists",
            "url": "https://docs.python.org/3/tutorial/introduction.html#lists"
        },
        {
            "title": "GeeksforGeeks Lists",
            "url": "https://www.geeksforgeeks.org/python-list/"
        }
    ],

    "Functions": [
        {
            "title": "Python Functions",
            "url": "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
        }
    ],

    "Loops": [
        {
            "title": "Python Loops",
            "url": "https://docs.python.org/3/tutorial/controlflow.html"
        }
    ],

    "Recursion": [
        {
            "title": "Recursion",
            "url": "https://www.geeksforgeeks.org/recursion-in-python/"
        }
    ],

    # ---------------- DSA ----------------

    "Arrays": [
        {
            "title": "Arrays",
            "url": "https://www.geeksforgeeks.org/array-data-structure/"
        }
    ],

    "Strings": [
        {
            "title": "Strings",
            "url": "https://www.geeksforgeeks.org/strings-in-python/"
        }
    ],

    "HashMap": [
        {
            "title": "HashMap",
            "url": "https://www.geeksforgeeks.org/hashmap-in-java-with-examples/"
        }
    ],

    "Sliding Window": [
        {
            "title": "Sliding Window",
            "url": "https://www.geeksforgeeks.org/window-sliding-technique/"
        }
    ],

    "Binary Search": [
        {
            "title": "Binary Search",
            "url": "https://www.geeksforgeeks.org/binary-search/"
        }
    ],

    "Sorting": [
        {
            "title": "Sorting Algorithms",
            "url": "https://www.geeksforgeeks.org/sorting-algorithms/"
        }
    ]
}


def add_learning_resources(analysis: dict):

    materials = analysis.get("learning_materials")

    if not materials:
        return analysis

    for item in materials:

        topic = item.get("topic", "")

        if topic in RESOURCE_MAP:
            item["resources"] = RESOURCE_MAP[topic]

    return analysis