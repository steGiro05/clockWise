from flask_login import UserMixin

class User(UserMixin):
<<<<<<< HEAD
    def __init__(self, id, username, first_name=None, last_name=None, birthday=None):
        self.id = id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.birthday = birthday
        self.authenticated = False

=======
    def __init__(self, id, username):
         self.id = id
         self.username = username
         self.authenticated = False
>>>>>>> 8ec45a23582a7183aafb696a3b23f74627bc7644
    def is_active(self):
        return self.is_active()

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return True

    def get_id(self):
        return self.id

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthday': self.birthday
        }
