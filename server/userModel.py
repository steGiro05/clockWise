from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, first_name, last_name, birthday, username):
          self.id = id
          self.first_name = first_name
          self.last_name = last_name
          self.birthday = birthday
          self.username = username
          self.authenticated = False
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
