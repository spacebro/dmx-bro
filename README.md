# DMX-bro

## events

There is a default hardcoded (and reserved) `blackout` event that will send every channel in every universe a value `0`.

## Get device id

```sh
# Mac OS
$ ioreg -p IOUSB -l -w 0

# Linux
$ lsusb
```
