/**
 * Complete production-ready source files for the iOS 18 Morph rootless Theos tweak.
 * Target: iOS 16.0 - 16.7.x (arm64 / arm64e) for Dopamine & palera1n
 */

export interface TweakFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const TWEAK_FILES: Record<string, TweakFile> = {
  control: {
    name: "control",
    path: "control",
    language: "makefile",
    description: "Debian package metadata configured for modern rootless iOS 16 (iphoneos-arm64 architecture).",
    content: `Package: com.jailbreak.ios18morph
Name: iOS 18 Morph (Control Center & Settings)
Version: 1.0.0
Architecture: iphoneos-arm64
Description: Recreates the iOS 18 Control Center modular round platters & modern Settings hero card UI on iOS 16.0-16.7.x.
Maintainer: Expert Jailbreak Developer <dev@theos.local>
Author: Expert Jailbreak Developer
Section: Tweaks
Depends: mobilesubstrate (>= 0.9.5000), firmware (>= 16.0), firmware (<= 16.7.10)
Icon: https://raw.githubusercontent.com/theos/theos/master/templates/ios/tweak/Resources/icon.png
Priority: optional
`,
  },

  makefile: {
    name: "Makefile",
    path: "Makefile",
    language: "makefile",
    description: "Theos build configuration with rootless scheme, ARM64/ARM64e architectures, and private frameworks.",
    content: `THEOS_PACKAGE_SCHEME = rootless
TARGET := iphone:clang:latest:16.0
INSTALL_TARGET_PROCESSES = SpringBoard Preferences

ARCHS = arm64 arm64e
DEBUG = 0
FINALPACKAGE = 1

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = iOS18Morph

iOS18Morph_FILES = Tweak.x
iOS18Morph_CFLAGS = -fobjc-arc -Wno-deprecated-declarations -Wno-unused-variable -Wno-unused-function
iOS18Morph_FRAMEWORKS = UIKit CoreGraphics QuartzCore AudioToolbox
iOS18Morph_PRIVATE_FRAMEWORKS = ControlCenterUI ControlCenterServices Preferences SpringBoardFoundation MaterialKit

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "killall -9 SpringBoard Preferences"
`,
  },

  plist: {
    name: "iOS18Morph.plist",
    path: "iOS18Morph.plist",
    language: "xml",
    description: "Filter plist to inject the tweak into SpringBoard (Control Center) and Preferences (Settings app).",
    content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Filter</key>
	<dict>
		<key>Bundles</key>
		<array>
			<string>com.apple.springboard</string>
			<string>com.apple.Preferences</string>
			<string>com.apple.ControlCenterUI</string>
		</array>
	</dict>
</dict>
</plist>
`,
  },

  tweakHeader: {
    name: "Tweak.h",
    path: "Tweak.h",
    language: "objectivec",
    description: "Comprehensive forward interfaces for iOS 16 ControlCenterUI, SpringBoard, and Preferences private classes.",
    content: `//
//  Tweak.h
//  iOS18Morph - iOS 18 UI for iOS 16 Rootless
//
//  Created for iOS 16.0-16.7.x (arm64/arm64e)
//

#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

#pragma mark - CA Continuous Corner Curve

extern NSString *const kCACornerCurveContinuous;

#pragma mark - Material & Visual Effects

@interface MTMaterialView : UIView
+ (instancetype)materialViewWithRecipe:(NSInteger)recipe options:(NSUInteger)options;
@property (nonatomic, assign) CGFloat weighting;
@end

#pragma mark - ControlCenterUI Forward Declarations

@interface CCUIContentModuleContainerView : UIView
@property (nonatomic, copy) NSString *moduleIdentifier;
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, readonly) MTMaterialView *backgroundMaterialView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIContentModuleContentContainerView : UIView
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, assign) BOOL expanded;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIModuleContentMetrics : NSObject
@property (nonatomic, readonly) CGFloat cornerRadius;
@property (nonatomic, readonly) CGFloat moduleWidth;
@property (nonatomic, readonly) CGFloat moduleHeight;
@property (nonatomic, readonly) CGFloat gridCellSize;
@end

@interface CCUIRoundButton : UIControl
@property (nonatomic, readonly) UIView *normalStateBackgroundView;
@property (nonatomic, readonly) UIImageView *glyphImageView;
@property (nonatomic, assign) BOOL useAlternateBackground;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIContinuousSliderView : UIControl
@property (nonatomic, readonly) UIView *valueIndicatorClippingView;
@property (nonatomic, readonly) UIView *backgroundView;
@property (nonatomic, assign) CGFloat value;
@property (nonatomic, assign) CGFloat continuousSliderCornerRadius;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIModularControlCenterOverlayViewController : UIViewController
@property (nonatomic, readonly) UIView *overlayHeaderView;
@property (nonatomic, readonly) UIScrollView *modularScrollView;
@end

@interface CCUIHeaderPocketView : UIView
@property (nonatomic, strong) UIView *powerButton;
@property (nonatomic, strong) UIView *editAddButton;
@end

#pragma mark - Preferences / Settings Forward Declarations

@interface PSSpecifier : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *identifier;
@property (nonatomic, strong) id target;
@property (nonatomic, strong) NSDictionary *properties;
- (id)propertyForKey:(NSString *)key;
- (void)setProperty:(id)value forKey:(NSString *)key;
@end

@interface PSTableCell : UITableViewCell
@property (nonatomic, strong) PSSpecifier *specifier;
@property (nonatomic, strong) UIImageView *iconImageView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface PSListController : UIViewController <UITableViewDataSource, UITableViewDelegate>
@property (nonatomic, strong) UITableView *table;
@property (nonatomic, strong) NSArray *specifiers;
- (PSSpecifier *)specifierAtIndex:(NSInteger)index;
- (PSSpecifier *)specifierForID:(NSString *)identifier;
- (void)viewDidLoad;
- (void)viewWillAppear:(BOOL)animated;
- (void)reloadSpecifiers;
@end

@interface PrefsListController : PSListController
@end

#pragma mark - Custom iOS 18 Settings Hero Card View

@interface iOS18SettingsHeroCardView : UIView
@property (nonatomic, strong) UIImageView *iconImageView;
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UILabel *descriptionLabel;
@property (nonatomic, strong) UIVisualEffectView *blurBackgroundView;
- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName;
@end
`,
  },

  tweakSource: {
    name: "Tweak.x",
    path: "Tweak.x",
    language: "objectivec",
    description: "Full Logos source code hooking ControlCenterUI and Preferences for iOS 18 visual transformation.",
    content: `//
//  Tweak.x
//  iOS18Morph - iOS 18 Design Language Hook for iOS 16.0-16.7.x
//  Rootless Theos Hooking Suite (arm64/arm64e)
//

#import "Tweak.h"
#import <objc/runtime.h>

#pragma mark - Constant Definitions

static const CGFloat kIOS18ModuleRadius = 26.0f;        // Continuous corner radius for 2x2 & 2x1 modules
static const CGFloat kIOS18CircleRadius = 32.0f;        // Fully round 1x1 toggle radius
static const CGFloat kIOS18SliderCornerRadius = 26.0f;  // Thick pill radius for continuous sliders
static const CGFloat kIOS18HeroCardHeight = 158.0f;     // Height of Settings Top Hero Card

#pragma mark - Custom iOS 18 Settings Hero Card Implementation

@implementation iOS18SettingsHeroCardView

- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName {
    self = [super initWithFrame:CGRectMake(16.0f, 10.0f, [UIScreen mainScreen].bounds.size.width - 32.0f, kIOS18HeroCardHeight)];
    if (self) {
        self.layer.cornerRadius = 24.0f;
        self.layer.cornerCurve = kCACornerCurveContinuous;
        self.layer.masksToBounds = YES;
        
        // Background Material Blur (iOS 18 Inset Card Style)
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemThinMaterial];
        _blurBackgroundView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
        _blurBackgroundView.frame = self.bounds;
        _blurBackgroundView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self addSubview:_blurBackgroundView];
        
        // Subtle Border Stroke
        self.layer.borderWidth = 0.5f;
        self.layer.borderColor = [UIColor colorWithWhite:1.0f alpha:0.12f].CGColor;
        
        // Category Icon Container (Rounded Squircle)
        UIView *iconContainer = [[UIView alloc] initWithFrame:CGRectMake((self.bounds.size.width - 56.0f) / 2.0f, 18.0f, 56.0f, 56.0f)];
        iconContainer.layer.cornerRadius = 14.0f;
        iconContainer.layer.cornerCurve = kCACornerCurveContinuous;
        iconContainer.backgroundColor = [UIColor colorWithRed:0.55f green:0.55f blue:0.58f alpha:0.25f];
        iconContainer.layer.masksToBounds = YES;
        [self addSubview:iconContainer];
        
        // Icon Image inside Squircle
        _iconImageView = [[UIImageView alloc] initWithFrame:CGRectMake(12.0f, 12.0f, 32.0f, 32.0f)];
        _iconImageView.contentMode = UIViewContentModeScaleAspectFit;
        _iconImageView.tintColor = [UIColor whiteColor];
        UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithPointSize:28.0 weight:UIImageSymbolWeightMedium];
        _iconImageView.image = [UIImage systemImageNamed:iconName withConfiguration:config];
        [iconContainer addSubview:_iconImageView];
        
        // Title Label ("General", etc.)
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20.0f, 82.0f, self.bounds.size.width - 40.0f, 24.0f)];
        _titleLabel.text = title;
        _titleLabel.textAlignment = NSTextAlignmentCenter;
        _titleLabel.font = [UIFont systemFontOfSize:19.0f weight:UIFontWeightBold];
        _titleLabel.textColor = [UIColor labelColor];
        [self addSubview:_titleLabel];
        
        // Description Subtitle Label
        _descriptionLabel = [[UILabel alloc] initWithFrame:CGRectMake(24.0f, 108.0f, self.bounds.size.width - 48.0f, 38.0f)];
        _descriptionLabel.text = desc;
        _descriptionLabel.textAlignment = NSTextAlignmentCenter;
        _descriptionLabel.numberOfLines = 2;
        _descriptionLabel.font = [UIFont systemFontOfSize:13.0f weight:UIFontWeightRegular];
        _descriptionLabel.textColor = [UIColor secondaryLabelColor];
        [self addSubview:_descriptionLabel];
    }
    return self;
}

@end

#pragma mark - ==========================================================
#pragma mark - PART 1: Control Center UI Hooks (SpringBoard & ControlCenterUI)
#pragma mark - ==========================================================

%group ControlCenterHooks

//
// Hook: CCUIContentModuleContainerView
// Transforms module platter containers into iOS 18 continuous rounded geometry
//
%hook CCUIContentModuleContainerView

- (void)layoutSubviews {
    %orig;
    
    // Apply iOS 18 continuous corner curvature
    self.layer.cornerCurve = kCACornerCurveContinuous;
    
    CGRect bounds = self.bounds;
    BOOL isSingleCell = (bounds.size.width <= 75.0f && bounds.size.height <= 75.0f);
    
    if (isSingleCell) {
        // iOS 18 1x1 circular platter (Flashlight, Low Power, Timer, Rotation Lock)
        CGFloat roundRadius = bounds.size.width / 2.0f;
        self.layer.cornerRadius = roundRadius;
        self.clipsToBounds = YES;
    } else {
        // iOS 18 2x2 and 2x1 rounded module platter (Connectivity, Media, Focus)
        self.layer.cornerRadius = kIOS18ModuleRadius;
        self.clipsToBounds = YES;
    }
    
    // Smooth background material corner radius
    if ([self respondsToSelector:@selector(backgroundMaterialView)]) {
        MTMaterialView *matView = [self backgroundMaterialView];
        if (matView) {
            matView.layer.cornerCurve = kCACornerCurveContinuous;
            matView.layer.cornerRadius = self.layer.cornerRadius;
            matView.clipsToBounds = YES;
        }
    }
}

%end

//
// Hook: CCUIContentModuleContentContainerView
// Ensures inner container views adapt corner curvature and clipping properly
//
%hook CCUIContentModuleContentContainerView

- (void)layoutSubviews {
    %orig;
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    
    CGRect bounds = self.bounds;
    BOOL isSingleCell = (bounds.size.width <= 75.0f && bounds.size.height <= 75.0f);
    
    if (isSingleCell) {
        self.layer.cornerRadius = bounds.size.width / 2.0f;
    } else {
        self.layer.cornerRadius = kIOS18ModuleRadius;
    }
    self.clipsToBounds = YES;
}

%end

//
// Hook: CCUIRoundButton
// Styles standalone round toggle buttons (Flashlight, Timer, QR, Dark Mode)
//
%hook CCUIRoundButton

- (void)layoutSubviews {
    %orig;
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = self.bounds.size.width / 2.0f;
    self.clipsToBounds = YES;
    
    UIView *bgView = nil;
    if ([self respondsToSelector:@selector(normalStateBackgroundView)]) {
        bgView = [self normalStateBackgroundView];
    }
    
    if (bgView) {
        bgView.layer.cornerCurve = kCACornerCurveContinuous;
        bgView.layer.cornerRadius = bgView.bounds.size.width / 2.0f;
        bgView.clipsToBounds = YES;
    }
}

%end

//
// Hook: CCUIContinuousSliderView
// Redesigns Brightness and Volume sliders with iOS 18 thick rounded capsule styling
//
%hook CCUIContinuousSliderView

- (void)layoutSubviews {
    %orig;
    
    // Enforce iOS 18 continuous capsule curves on the slider
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = kIOS18SliderCornerRadius;
    self.clipsToBounds = YES;
    
    // Clipping subview that contains the live fluid fill level
    if ([self respondsToSelector:@selector(valueIndicatorClippingView)]) {
        UIView *clippingView = [self valueIndicatorClippingView];
        if (clippingView) {
            clippingView.layer.cornerCurve = kCACornerCurveContinuous;
            clippingView.layer.cornerRadius = kIOS18SliderCornerRadius;
            clippingView.clipsToBounds = YES;
        }
    }
    
    // Background blur layer of the slider
    if ([self respondsToSelector:@selector(backgroundView)]) {
        UIView *bg = [self backgroundView];
        if (bg) {
            bg.layer.cornerCurve = kCACornerCurveContinuous;
            bg.layer.cornerRadius = kIOS18SliderCornerRadius;
            bg.clipsToBounds = YES;
        }
    }
}

%end

//
// Hook: CCUIModularControlCenterOverlayViewController
// Adds top Edit '+' and Power buttons plus page indicators for multi-page CC
//
%hook CCUIModularControlCenterOverlayViewController

- (void)viewDidLoad {
    %orig;
    
    // Add iOS 18 Top Bar items (+ customize button on top-left, Power button on top-right)
    UIView *headerView = self.view;
    if ([self respondsToSelector:@selector(overlayHeaderView)]) {
        headerView = [self overlayHeaderView] ?: self.view;
    }
    
    // Top-left '+' Customize Button
    UIButton *addButton = [UIButton buttonWithType:UIButtonTypeSystem];
    addButton.frame = CGRectMake(24.0f, 54.0f, 36.0f, 36.0f);
    addButton.tag = 1801;
    UIImageSymbolConfiguration *addConfig = [UIImageSymbolConfiguration configurationWithPointSize:17.0 weight:UIImageSymbolWeightSemibold];
    [addButton setImage:[UIImage systemImageNamed:@"plus" withConfiguration:addConfig] forState:UIControlStateNormal];
    addButton.tintColor = [UIColor whiteColor];
    addButton.backgroundColor = [UIColor colorWithWhite:1.0f alpha:0.16f];
    addButton.layer.cornerRadius = 18.0f;
    addButton.layer.cornerCurve = kCACornerCurveContinuous;
    [headerView addSubview:addButton];
    
    // Top-right Power Button
    UIButton *powerButton = [UIButton buttonWithType:UIButtonTypeSystem];
    powerButton.frame = CGRectMake([UIScreen mainScreen].bounds.size.width - 60.0f, 54.0f, 36.0f, 36.0f);
    powerButton.tag = 1802;
    UIImageSymbolConfiguration *pwrConfig = [UIImageSymbolConfiguration configurationWithPointSize:16.0 weight:UIImageSymbolWeightBold];
    [powerButton setImage:[UIImage systemImageNamed:@"power" withConfiguration:pwrConfig] forState:UIControlStateNormal];
    powerButton.tintColor = [UIColor whiteColor];
    powerButton.backgroundColor = [UIColor colorWithWhite:1.0f alpha:0.16f];
    powerButton.layer.cornerRadius = 18.0f;
    powerButton.layer.cornerCurve = kCACornerCurveContinuous;
    [headerView addSubview:powerButton];
}

%end

%end // ControlCenterHooks

#pragma mark - ==========================================================
#pragma mark - PART 2: Settings App Hooks (Preferences.app)
#pragma mark - ==========================================================

%group SettingsHooks

//
// Hook: PSListController / Category Views
// Injects the iconic iOS 18 Hero Card at the top of category pages (e.g. General)
//
%hook PSListController

- (void)viewDidLoad {
    %orig;
    
    NSString *controllerTitle = self.title ?: @"";
    NSString *specifierID = [[self specifier] identifier] ?: @"";
    
    // Check if this controller is the "General" category or specific sub-settings
    BOOL isGeneral = [controllerTitle isEqualToString:@"General"] || 
                     [specifierID isEqualToString:@"General"] || 
                     [self isKindOfClass:objc_getClass("GeneralController")];
                     
    if (isGeneral) {
        // Instantiate our custom iOS 18 Hero Header Card
        iOS18SettingsHeroCardView *heroCard = [[iOS18SettingsHeroCardView alloc] 
            initWithTitle:@"General"
            description:@"Manage your overall setup and preferences for iPhone, such as software updates, device language, CarPlay, AirDrop, and more."
            iconName:@"gearshape.fill"];
        
        UIView *headerContainer = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, kIOS18HeroCardHeight + 20.0f)];
        [headerContainer addSubview:heroCard];
        
        self.table.tableHeaderView = headerContainer;
    }
}

- (void)viewWillAppear:(BOOL)animated {
    %orig(animated);
    
    // Enforce modern inset grouped table style and background
    if (self.table) {
        self.table.separatorInset = UIEdgeInsetsMake(0, 56.0f, 0, 16.0f);
        self.table.layoutMargins = UIEdgeInsetsMake(0, 16.0f, 0, 16.0f);
    }
}

%end

//
// Hook: PSTableCell
// Modernizes table cells into iOS 18 inset card rows with continuous corner curves
//
%hook PSTableCell

- (void)layoutSubviews {
    %orig;
    
    // Round cell background corners with continuous curve
    self.layer.cornerCurve = kCACornerCurveContinuous;
    
    // Modernize icon spacing & corner radii
    UIImageView *iconView = nil;
    if ([self respondsToSelector:@selector(iconImageView)]) {
        iconView = [self iconImageView];
    } else {
        iconView = self.imageView;
    }
    
    if (iconView) {
        iconView.layer.cornerCurve = kCACornerCurveContinuous;
        iconView.layer.cornerRadius = 7.0f;
        iconView.layer.masksToBounds = YES;
    }
}

%end

%end // SettingsHooks

#pragma mark - ==========================================================
#pragma mark - Initialization Constructor
#pragma mark - ==========================================================

%ctor {
    @autoreleasepool {
        NSString *bundleID = [[NSBundle mainBundle] bundleIdentifier];
        
        // Initialize SpringBoard / Control Center hooks
        if ([bundleID isEqualToString:@"com.apple.springboard"] || 
            [bundleID isEqualToString:@"com.apple.ControlCenterUI"]) {
            %init(ControlCenterHooks);
        }
        
        // Initialize Settings (Preferences.app) hooks
        if ([bundleID isEqualToString:@"com.apple.Preferences"]) {
            %init(SettingsHooks);
        }
    }
}
`,
  },

  postinst: {
    name: "postinst",
    path: "DEBIAN/postinst",
    language: "bash",
    description: "Post-installation script to respring SpringBoard safely via sbreload.",
    content: `#!/bin/sh
if [ "$1" = "configure" ]; then
    echo "[iOS18Morph] Respringing SpringBoard to activate iOS 18 hooks..."
    if command -v sbreload >/dev/null 2>&1; then
        sbreload
    elif command -v killall >/dev/null 2>&1; then
        killall -9 SpringBoard Preferences
    fi
fi
exit 0
`,
  },
};
