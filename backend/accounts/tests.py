import pytest

from accounts.models import UserAccount as User


@pytest.mark.django_db
def test_user_create():
    User.objects.create(
        name='john', email="johndoe@gmail.com", password='johndoepassword123')
    assert User.objects.count() == 1
