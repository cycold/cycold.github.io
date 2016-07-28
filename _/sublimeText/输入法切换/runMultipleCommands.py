# run_multiple_commands.py
import sublime, sublime_plugin, subprocess
from os import path

# Takes an array of commands (same as those you'd provide to a key binding) with
# an optional context (defaults to view commands) & runs each command in order.
# Valid contexts are 'text', 'window', and 'app' for running a TextCommand,
# WindowCommands, or ApplicationCommand respectively.中文
class ImSwitchForVintageCommand(sublime_plugin.TextCommand):
  def change_input_method(self, input_method):
    # cmd = './im ' + input_method
    cmd = '/usr/local/bin/changeInputMethod ' + input_method
    proc = subprocess.Popen(cmd, cwd=path.dirname(__file__),
                                 shell=True,
                                 stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE,
                                 stdin=None)
    # output, error = proc.communicate(None)
    proc.communicate(None)
    proc.poll()

  def exec_command(self, command):
    if not 'command' in command:
      raise Exception('No command name provided.')

    args = None
    if 'args' in command:
      args = command['args']

    # default context is the view since it's easiest to get the other contexts
    # from the view

    context = self.view
    if 'context' in command:
      context_name = command['context']
      if context_name == 'window':
        context = context.window()
      elif context_name == 'app':
        context = sublime
      elif context_name == 'text':
        pass
      else:
        raise Exception('Invalid command context "'+context_name+'".')

    # skip args if not needed
    if args is None:
      context.run_command(command['command'])
    else:
      context.run_command(command['command'], args)

  def run(self, edit):
    self.exec_command({'command': 'exit_insert_mode'})
    self.change_input_method('U.S.')

