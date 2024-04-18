![logo](https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/logo.png)


## Description

Do you find giving oral medication to dogs at home difficult? MediMunch is the solution for you! To accompany the silicone treat mold, utilize this complementary software for additional benefits. This application starts with a splash screen of the MediMunch logo and prompts users to enter in their pet’s information. After, users gain access to all of the app’s features, including a timer for their treat mold, reminders/notifications of when to give their dog each medicine, a calendar tracker to keep track of each day’s medication intake, and a medication info screen to learn more about your medications/other medications in the database (including a description and side effects of the medicine, along with recipes for the treat mold mixes). 

To learn more about MediMunch, check out these [slides](https://docs.google.com/presentation/d/1VCdgOsYDrXRY6UgmRRnKauilP1vBGeOyGBTiA6n8ACo/edit#slide=id.g4dfce81f19_0_45). The MediMunch app was created using React Native, JavaScript, and Supabase.

## Getting Started

The MediMunch App can be run on any platform, but it was designed specifically for iOS.

### Installation

Clone this repository or download the code. Open a terminal or command prompt window and run the following to install Expo CLI:
```
npm install -g expo-cli
```
Navigate to the project folder in the terminal/command prompt window where you’ve downloaded the project:
```
cd path/to/medimunch-app
```
Run the following to install the project dependencies:
```
npm install
```
Start the Expo server:
```
npx expo start
```
To run on a simulator, press ‘i’ for iOS or 'a' for Android. To run on a physical device, download the Expo go app and scan the QR code displayed with your device’s camera.


### Usage

<div style="display: flex; justify-content: center;">
<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/initial%20home%20screen.PNG" alt="Initial Home Screen" width="200"> 
</div>
<br>
<Text style="display: flex; align-items: center;">This is what the Home Screen looks like. Users can set a timer to keep track of how long their treats need to be in the treat mold for. </Text>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/setting%20timer.PNG" alt="Setting Timer" width="200">

<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/timer%20over%20notification.PNG" alt="Timer Over Notification" width="200">
</div>
<br>
When clicking on the white timer box, a pop up prompting the user to set a time will appear. Once users click "Set Time," the timer will update accordingly. Clicking start begins the timer, and clicking reset sets the timer back to zero. Once the timer begins, users have the option of pausing the timer (the "Pause" button replaces the "Start" button). Once the time is up, users are notified that their dog's medicine is ready.
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/selecting%20exisisting%20medicine.PNG" alt="Selecting an Existing Medicine" width="200">

<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/seeing%20reminders.PNG" alt="Seeing Reminders" width="200">
</div>
<br>
To see reminders of when to take each medicine, users can click on the purple box, where they can toggle between their dog's medicines. Once selecting the medicine and clicking the "Done" button, the "Take By" time will change accordingly, and it will inform users if they have notifications set to on (notifications on is the default).
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/adding%20a%20medicine.PNG" alt="Adding a Medicine" width="200">
</div>
<br>
<Text style="display: flex; align-items: center;">Users can also add new medicines from the database to the list of their dog's medicines. Users do this by choosing the medicine and entering the daily time their dog should be taking the medicine at.</Text>
<br>
<br>
<div style="display: flex; justify-content: center;">

<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/medication%20info%20screen.PNG" alt="Medication Info Screen" width="200">

<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/medicine%20description.PNG" alt="Medicine Description" width="200">

<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/side%20effects%20and%20recipes.PNG" alt="Medicine Side Effects & Recipes" width="200">
</div>
<br>
The screens above represent the medication information screen. Users can search for a medicine in the database to learn more about it, or they can click on one of their medicines for easier access. Once typing in a medicine, selecting it, and clicking the "Search" button OR clicking on one of the medicines in the blue box, users will be taken to a page with the medicine's name, along with a description of it, its side effects, and a recommended recipe for making the treat mix. Clicking the "Back" button brings users to the original medication information screen and allows them to learn more about other medicines if they wish.
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://github.com/angelina-dong/medimunch-app/blob/main/readme%20images/calendar%20screen.PNG" alt="Calendar Screen" width="200">
</div>
<br>
<Text style="display: flex; align-items: center; margin-left: 60">This is what the Calendar Screen looks like. Users can set dates for when each medicine was taken. Dark green = start date, dark red = end date, light green = took medicine that day, light red = didn't take medicine that day. Also, by clicking on the orange box with the medicine name in it, users can toggle between their different medicine trackers. </Text>

#### Click [here](https://drive.google.com/file/d/1N65f9YDA3cTiS2l_PymY7GYPokW2z4lo/view?usp=sharing) for a quick video walkthrough of the app and its features.

## Contributors
- [Angelina Dong](https://github.com/angelina-dong)
- ENTR3330 Fall 2023 Team #5, including [Noh Woldeyesus](https://github.com/nohwolde) and Sophia Martin

*The MediMunch app was created and designed in NEU's CS4992 course alongside the ENTR3330 course.
