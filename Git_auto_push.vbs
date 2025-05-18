' Create shell object
Set shell = CreateObject("WScript.Shell")

' Prompt for commit message
commitMessage = InputBox("Enter your commit message:", "Git Commit Message")

If commitMessage = "" Then
    MsgBox "Commit message cannot be empty. Script will exit.", 48 ' vbExclamation
    WScript.Quit
End If

' Set working directory (Update this path to your local Git repo)
repoPath = "C:\Users\jimmy\Desktop\rigtools-updated-ui"
shell.CurrentDirectory = repoPath

' Run git commands
shell.Run "cmd /c git pull", 1, True
shell.Run "cmd /c git add .", 1, True
shell.Run "cmd /c git commit -m """ & commitMessage & """", 1, True
shell.Run "cmd /c git push origin main", 1, True

MsgBox "Git operations completed.", 64 ' vbInformation
