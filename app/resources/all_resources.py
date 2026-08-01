from .python_resources import PYTHON_RESOURCES
from .java_resources import JAVA_RESOURCES
from .c_resources import C_RESOURCES
from .cpp_resources import CPP_RESOURCES
from .javascript_resources import JAVASCRIPT_RESOURCES

from .dsa_resources import DSA_RESOURCES
from .algorithm_resources import ALGORITHM_RESOURCES
from .oop_resources import OOP_RESOURCES
from .dbms_resources import DBMS_RESOURCES
from .debugging_resources import DEBUGGING_RESOURCES



ALL_RESOURCES = {

    # Programming Languages
    **PYTHON_RESOURCES,
    **JAVA_RESOURCES,
    **C_RESOURCES,
    **CPP_RESOURCES,
    **JAVASCRIPT_RESOURCES,


    # DSA
    **DSA_RESOURCES,


    # Algorithms
    **ALGORITHM_RESOURCES,


    # OOP Concepts
    **OOP_RESOURCES,


    # Database
    **DBMS_RESOURCES,


    # Debugging
    **DEBUGGING_RESOURCES

}