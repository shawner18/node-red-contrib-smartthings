# node-red-contrib-smartthings

[![Donate](/docs/donation.png?raw=true)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=65XBWNBZ69ZP4&currency_code=USD&source=url)

This is a smartthings plugin to NodeRed. It allows you to control your devices and get their status using NodeRed.

# Installing

```
npm install node-red-contrib-smartthings
```

or add to your package.json

```
"node-red-contrib-smartthings": "*"
```

this is how it will looks like:

![Menu](/docs/nodered_menu.png?raw=true "Menu")

***Icon made by [Freepik](https://www.freepik.com/home) from [www.flaticon.com](www.flaticon.com)***

# Configuring

Every device node will have an **Account** property which must be configured.

You only have to create this configuration once and use it in all device nodes.

Configuration Node Edit Window:

![Configuration Node](/docs/config.png?raw=true "Configuration Node")
![Configuration Node](/docs/config_token.png?raw=true "Configuration Node")

As you can see, the only relevant information here is a **token**

# Token

In order to allow the plugin to have access to your devices using Smartthings API
you must provide a **token**

You can get a Smartthings Token here:
[https://account.smartthings.com/tokens](https://account.smartthings.com/tokens)

# SmartApp

This module works as a SmartApp to receive events back from smartthings.

**Keep in mind that your nodered must be installed with a public IP address, a domain
and a valid SSL certificate. Without those smartthings will not be able to send us
any event.**

The SmartApp can be registered at this address: [Samsung Developer Portal](https://smartthings.developer.samsung.com/)

To install the SmartApp you can follow these steps:

1. Access [Samsung Developer Portal](https://smartthings.developer.samsung.com/)
2. Create a new Project
3. Select the "Automation for the Smartthings App" option
4. Give your project a name
5. Click at the "Register App" button
6. Select the "WebHook Endpoint" option
7. The target URL will be your nodered domain, with https, port, if necessary,
and the path to your SmartApp. It should be something like that: https://your-nodered-domain:your-nodered-server-port/smartthings/smartapp.
8. Give your App a Display Name. That will be what you will see at the SmartThings App.
9. Select all permissions.
10. Finish the process and go to the Project Overview.
11. Change SmartApp status from "Develop" to "Deployed to test"

After all those procedures your app should be fine.

**To see it at your SmartThings app you need to make sure it is in developer mode.**

To put your Smartthings App in developer mode you need to press and hold the "About SmartThings" option
at the menu for 5 seconds. The option to activate the developer mode show appear after that.

Enable it and you should be good to go.

# Using Dynamic IP's

Some dynamic ip dns providers offers SSL certificates for free. It is the case of [NoIP](https://www.noip.com)

# Configuring the SmartApp

1. At your SmartThings App you need to create a new automation, at the discovery panel,
   you will see the NodeRed SmartApp. Click on it, select all devices SmartThings should
   notify you. Only the selected devices will send events back to
   NodeRed. Those not selected will not have theirs status updated.

# Debugging the SmartApp

If you are having any issue with the nodes not updating after the deploy, usually,
it is a misconfiguration of the SmartApp.

To debug the communication between the SmartApp and the NodeRed WebHook you can follow
these steps:

https://github.com/otaviojr/node-red-contrib-smartthings/blob/master/DEBUG_SMARTAPP.md

# Device Nodes

Once in NodeRed at SmartThings group you will see many devices nodes. Switch, Level,
Color, Humidity, Motion, Contact, etc..

Every node will keep its state. Every time a device state changes a message will
be send to the output node with the ```msg.topic``` of **device** with all relevant
informations at the ```msg.payload``` property.

Device changes are received through the webhook you set up at SmartThings Developers
Portal.

All device nodes can receive at its input a message with the ```msg.topic``` of
**update** to force the output of the current saved device state. This is useful when
handling a request, for example.
If you want to pull the current status from SmartThings, you can send a message with the ```msg.topic``` of **pull**;

Some devices can have their state changed. You can turn on a light, change
level and color, or, open your door.

For example, to turn on a switch you can send a message to its device node:

```
{
    topic: "switch",
    payload: {
        value: 1
    }
}
```

This will turn on the device using Smartthings API and send the current status to the output.

This will be documented inside the NodeRed help window for each node.

# Donation

And... if this helps you to save time and money. Pay me a coffee. :-)

[![Donate](/docs/donation.png?raw=true)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=65XBWNBZ69ZP4&currency_code=USD&source=url)
