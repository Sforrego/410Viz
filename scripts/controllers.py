from endpoints import Controller

class Default(Controller):
  def GET(self):
    return "boom"

  def POST(self, **kwargs):
    return kwargs

class Foo(Controller):
  def GET(self):
    return "bang"
