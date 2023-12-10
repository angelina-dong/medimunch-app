![logo](https://cdn.discordapp.com/attachments/1162101647653208155/1183436744520106064/thumbnail.png?ex=6588545b&is=6575df5b&hm=d70f4bebd34677baad8d0071487bb25c19e084edc9e136e01ac649c802d2d961&)


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
<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304423551047/IMG_7365.PNG?ex=658803da&is=65758eda&hm=161ba521e5a6d8ae8f409a30bfc4f189b4ec3ce82ed64b365b102a692695b69d&" alt="Initial Home Screen" width="200"> 
<Text style="display: flex; align-items: center; margin-left: 60"> <- This is what the Home Screen looks like. Users can set a timer to keep track of how long their treats need to be in the treat mold for. </Text>
</div>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350303966380072/IMG_7370.PNG?ex=658803da&is=65758eda&hm=d5d871f948f5db8aec7ccfb69cb08010a70251cc993872e53f1b85f0e23a167b&
" alt="Setting Timer" width="200">

<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304461295727/IMG_7372.PNG?ex=658803da&is=65758eda&hm=b1b23d2daf8678f166ddc8196db5eb9c1587d3d9d79961eca02700cd72f8aa18&" alt="Timer Over Notification" width="200">
</div>
<br>
When clicking on the white timer box, a pop up prompting the user to set a time will appear. Once users click "Set Time," the timer will update accordingly. Clicking start begins the timer, and clicking reset sets the timer back to zero. Once the timer begins, users have the option of pausing the timer (the "Pause" button replaces the "Start" button). Once the time is up, users are notified that their dog's medicine is ready.
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304213831770/IMG_7366.PNG?ex=658803da&is=65758eda&hm=35200925562f5330c3853f1ce5f8189b116fab3be0acdaf9115f40323fb9a585&" alt="Selecting an Existing Medicine" width="200">

<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304079618049/IMG_7371.PNG?ex=658803da&is=65758eda&hm=826d487e25e2531224c23fb0ae1f772a564a9a88faf3c26664733f81a50d10f2&" alt="Seeing Reminders" width="200">
</div>
<br>
To see reminders of when to take each medicine, users can click on the purple box, where they can toggle between their dog's medicines. Once selecting the medicine and clicking the "Done" button, the "Take By" time will change accordingly, and it will inform users if they have notifications set to on (notifications on is the default).
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<Text style="display: flex; align-items: center; margin-right: 60">Users can also add new medicines from the database to the list of their dog's medicines. Users do this my choosing the medicine and entering the daily time their dog should be taking the medicine at. -> </Text>
<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304704569344/IMG_7367.PNG?ex=658803da&is=65758eda&hm=f5df78781f94f66661168a0ac708793c0493610f49318729dda46b48853db4d8&" alt="Adding a Medicine" width="200">
</div>
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">

<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350303907655730/IMG_7362.PNG?ex=658803da&is=65758eda&hm=3097b01efdf9a98dd2b1858862cd6b144cf708980aa9ff37d881c4102bfbde7b&" alt="Medication Info Screen" width="200">

<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304415162388/IMG_7368.PNG?ex=658803da&is=65758eda&hm=623706ad2608a1e37427e983ed0d3d0bf65c960d849896452397f337d475ed52&" alt="Medicine Description" width="200">

<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350304243200080/IMG_7369.PNG?ex=658803da&is=65758eda&hm=a5d6d6ce4d058c30dc8d28bb769e4fee8266e2782e88a46e97e937cf5f766ff8&" alt="Medicine Side Effects & Recipes" width="200">
</div>
<br>
The screens above represent the medication information screen. Users can search for a medicine in the database to learn more about it, or they can click on one of their medicines for easier access. Once typing in a medicine, selecting it, and clicking the "Search" button OR clicking on one of the medicines in the blue box, users will be taken to a page with the medicine's name, along with a description of it, its side effects, and a recommended recipe for making the treat mix. Clicking the "Back" button brings users to the original medication information screen and allows them to learn more about other medicines if they wish.
<br>
<br>
<br>
<div style="display: flex; justify-content: center;">
<img src="https://cdn.discordapp.com/attachments/1162101647653208155/1183350303962177566/IMG_7361.PNG?ex=658803da&is=65758eda&hm=25e10d98673494170ecbee0dc638061c0e26c6b0aebffb28a0b9a75586810875&" alt="Calendar Screen" width="200">
<Text style="display: flex; align-items: center; margin-left: 60"> <- This is what the Calendar Screen looks like. Users can set dates for when each medicine was taken. Dark green = start date, dark red = end date, light green = took medicine that day, light red = didn't take medicine that day. Also, by clicking on the orange box with the medicine name in it, users can toggle between their different medicine trackers.*96 </Text>
</div>

#### Click [here](https://drive.google.com/file/d/1N65f9YDA3cTiS2l_PymY7GYPokW2z4lo/view?usp=sharing) for a quick video walkthrough of the app and its features.

## Contributors
- [Angelina Dong](https://github.com/angelina-dong)
- ENTR3330 Fall 2023 Team #5, including [Noh Woldeyesus](https://github.com/nohwolde) and Sophia Martin

*The MediMunch app was created and designed in NEU's CS4992 course alongside the ENTR3330 course.
