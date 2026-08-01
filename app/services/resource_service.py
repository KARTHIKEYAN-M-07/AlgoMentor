from copy import deepcopy

from app.resources.all_resources import ALL_RESOURCES
from app.resources.topic_alias import TOPIC_ALIASES


def normalize_topic(topic: str) -> str:
    """
    Convert AI generated topic into resource dictionary format.
    """

    if not topic:
        return ""

    topic = topic.strip()

    # Exact match
    if topic in ALL_RESOURCES:
        return topic

    # Case insensitive matching
    for key in ALL_RESOURCES.keys():

        if key.lower() == topic.lower():
            return key

    # Alias matching
    alias_topic = TOPIC_ALIASES.get(
        topic.lower(),
        topic
    )

    # Check alias result
    if alias_topic in ALL_RESOURCES:
        return alias_topic

    return topic



def remove_duplicates(resources):
    """
    Remove duplicate resources using URL.
    """

    seen = set()
    unique_resources = []

    for resource in resources:

        url = resource.get("url")

        if url and url not in seen:

            seen.add(url)
            unique_resources.append(resource)

    return unique_resources



def get_resources(topic: str):
    """
    Fetch resources for a topic.
    """

    normalized_topic = normalize_topic(topic)

    resources = deepcopy(
        ALL_RESOURCES.get(
            normalized_topic,
            []
        )
    )

    resources = remove_duplicates(resources)

    resources.sort(
        key=lambda item: (
            item.get("difficulty", ""),
            item.get("platform", "")
        )
    )

    return resources



def attach_resources(analysis: dict) -> dict:
    """
    Attach learning resources to AI learning materials.
    """

    if not analysis:
        return analysis


    learning_materials = analysis.get(
        "learning_materials",
        []
    )


    if not learning_materials:

        analysis["learning_materials"] = []

        return analysis



    for material in learning_materials:

        topic = material.get(
            "topic",
            ""
        )


        material["resources"] = get_resources(topic)



    analysis["learning_materials"] = learning_materials


    return analysis