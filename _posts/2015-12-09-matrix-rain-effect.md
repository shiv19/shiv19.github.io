---
layout: post
title: Create a Matrix Rain Effect on Command Prompt
date: 2015-12-09 17:28
author: multishiv19
comments: true
categories: [Command Prompt, Effect, Matrix, Matrix Rain, Matrix Rain Effect, Rain, Tricks, Tricks, Windows]
---

Impress your friends with this cool trick

![Post Header Image]({{ site.baseurl }}/assets/img/mat-rain-1.png "Create a Matrix Rain Effect on Command Prompt")
Hi, in this tutorial I'll guide you through the process of creating a simple and cool effect called the **Matrix Rain Effect** that you can easily make and show off to your friends.

After following through this tutorial, you'll be able to make an effect which looks like the GIF down below using command prompt.
* * *
![Finished Effect Image]({{ site.baseurl }}/assets/img/mat-rain-2.gif "Finished effect")
* * *
#### So let's get started with it. These are the things that you'll need:

*   Text Editor (Notepad, WordPad, etc)
*   Command Prompt

# Step 1:

*   ## Open Notepad

*   ## Start off by typing the following code

> @echo off  
> color 02  
> mode 1000  
> cls  
> :start

### Explanation:

**@echo off :** This turns off displaying of the path of the current directory in command prompt.

**color 02 :** This makes the background color black, and the text color green in command prompt. For a full list of available colors, you can goto command prompt and type `color ?` and hit Enter. Below is a list of available colors,  
0 = Black 8 = Gray  
1 = Blue 9 = Light Blue  
2 = Green A = Light Green  
3 = Aqua B = Light Aqua  
4 = Red C = Light Red  
5 = Purple D = Light Purple  
6 = Yellow E = Light Yellow  
7 = White F = Bright White

**mode 1000:** This makes the command prompt window appear as big as possible on your screen.

**cls :** This clears the command prompt screen.

**:start :** This is a label, you can replace "start" with your name if you want.

*   ## Here comes the actual printing part, on the next line type

> echo %random%

Press the Tab key on your keyboard, now while holding the keys Ctrl, Shift press the Left Arrow Key on your keyboard 2 times. This should select the "Tab" spacing and "%random%".  
Hit Ctrl + C on your keyboard once.  
Now press and hold Ctrl + V on your keyboard for about 5 seconds and then press Enter.  
**Finally type**

> goto start

### Explanation:

**echo %random% :** This will print a random number on the screen. And since we want to print a lot of random numbers on the screen, I asked you to paste so many copies of it. We used a Tab spacing to make it look indented while it prints on the screen.

**goto start :** This will restart the process, in other words, it will loop back to the place where we typed the "start" label.  
Note: If u used your own word when we typed the label earlier, then u must replace the "start" with that word here.

*   ## Saving the file (Ctrl+S)

**IMPORTANT:** Save the file with the extension **.bat**  
For example, I saved my file as **"Matrix.bat"** on my desktop, you can use your own name followed by **.bat**

# Step 2:

*   ## Run the program by double clicking on it

Navigate to the place where you saved the file and double click on it to open the program.

## Enjoy! :D

*   ## Closing the program

To close the program, press Ctrl+C in command prompt and press "y" to stop the execution.

### Got any Doubts or Comments, leave it in the comment section down below  
Play around with that echo command and feel free to comment your own version of the Matrix Rain effect.
