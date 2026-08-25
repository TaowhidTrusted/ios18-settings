export THEOS_PACKAGE_SCHEME = rootless
TARGET := iphone:clang:16.5:16.0
ARCHS := arm64 arm64e

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = iOS18Morph

iOS18Morph_FILES = Tweak.x
iOS18Morph_CFLAGS = -fobjc-arc -Wno-unused-variable -Wno-unused-function
iOS18Morph_FRAMEWORKS = UIKit CoreGraphics QuartzCore AudioToolbox
iOS18Morph_PRIVATE_FRAMEWORKS = ControlCenterUI ControlCenterServices Preferences

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "sbreload"
