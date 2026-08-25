//
//  Tweak.x
//  iOS18Morph - iOS 18 Design Language Hook for iOS 16.0-16.7.x
//  Rootless Theos Hooking Suite (arm64/arm64e)
//

#import "Tweak.h"
#import <objc/runtime.h>

#pragma mark - Constant Definitions

static const CGFloat kIOS18ModuleRadius = 26.0f;        // Continuous corner radius for 2x2 & 2x1 modules
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
        
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemThinMaterial];
        _blurBackgroundView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
        _blurBackgroundView.frame = self.bounds;
        _blurBackgroundView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self addSubview:_blurBackgroundView];
        
        self.layer.borderWidth = 0.5f;
        self.layer.borderColor = [UIColor colorWithWhite:1.0f alpha:0.12f].CGColor;
        
        UIView *iconContainer = [[UIView alloc] initWithFrame:CGRectMake((self.bounds.size.width - 56.0f) / 2.0f, 18.0f, 56.0f, 56.0f)];
        iconContainer.layer.cornerRadius = 14.0f;
        iconContainer.layer.cornerCurve = kCACornerCurveContinuous;
        iconContainer.backgroundColor = [UIColor colorWithRed:0.55f green:0.55f blue:0.58f alpha:0.25f];
        iconContainer.layer.masksToBounds = YES;
        [self addSubview:iconContainer];
        
        _iconImageView = [[UIImageView alloc] initWithFrame:CGRectMake(12.0f, 12.0f, 32.0f, 32.0f)];
        _iconImageView.contentMode = UIViewContentModeScaleAspectFit;
        _iconImageView.tintColor = [UIColor whiteColor];
        UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithPointSize:28.0 weight:UIImageSymbolWeightMedium];
        _iconImageView.image = [UIImage systemImageNamed:iconName withConfiguration:config];
        [iconContainer addSubview:_iconImageView];
        
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20.0f, 82.0f, self.bounds.size.width - 40.0f, 24.0f)];
        _titleLabel.text = title;
        _titleLabel.textAlignment = NSTextAlignmentCenter;
        _titleLabel.font = [UIFont systemFontOfSize:19.0f weight:UIFontWeightBold];
        _titleLabel.textColor = [UIColor labelColor];
        [self addSubview:_titleLabel];
        
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

// Helper function to apply circular or squircle styling to any view
static void applyIOS18PlatterStyle(UIView *view) {
    if (!view) return;
    CGRect bounds = view.bounds;
    if (bounds.size.width <= 0 || bounds.size.height <= 0) return;
    
    view.layer.cornerCurve = kCACornerCurveContinuous;
    
    // 1x1 toggle check (Flashlight, Low Power, Timer, Camera, Shazam, Wallet, etc.)
    if (bounds.size.width <= 78.0f && bounds.size.height <= 78.0f) {
        CGFloat radius = MIN(bounds.size.width, bounds.size.height) / 2.0f;
        view.layer.cornerRadius = radius;
        view.clipsToBounds = YES;
    } else {
        // 2x2 platter or 2x1 Focus module
        view.layer.cornerRadius = kIOS18ModuleRadius;
        view.clipsToBounds = YES;
    }
}

//
// Hook: CCUIContentModuleContainerView
//
%hook CCUIContentModuleContainerView

- (void)layoutSubviews {
    %orig;
    applyIOS18PlatterStyle(self);
    
    if ([self respondsToSelector:@selector(backgroundMaterialView)]) {
        UIView *matView = (UIView *)[self backgroundMaterialView];
        if (matView) {
            applyIOS18PlatterStyle(matView);
        }
    }
    
    if ([self respondsToSelector:@selector(contentView)]) {
        UIView *cView = [self contentView];
        if (cView) {
            applyIOS18PlatterStyle(cView);
        }
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect bounds = self.bounds;
    if (bounds.size.width <= 78.0f && bounds.size.height <= 78.0f) {
        %orig(MIN(bounds.size.width, bounds.size.height) / 2.0f);
    } else {
        %orig(kIOS18ModuleRadius);
    }
}

%end

//
// Hook: CCUIContentModuleContentContainerView
//
%hook CCUIContentModuleContentContainerView

- (void)layoutSubviews {
    %orig;
    applyIOS18PlatterStyle(self);
    
    if ([self respondsToSelector:@selector(contentView)]) {
        UIView *cView = [self contentView];
        if (cView) {
            applyIOS18PlatterStyle(cView);
        }
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect bounds = self.bounds;
    if (bounds.size.width <= 78.0f && bounds.size.height <= 78.0f) {
        %orig(MIN(bounds.size.width, bounds.size.height) / 2.0f);
    } else {
        %orig(kIOS18ModuleRadius);
    }
}

%end

//
// Hook: CCUIButtonModuleView
// 1x1 buttons (Flashlight, Low Power, Timer, Camera, Shazam, Screen Recording, Wallet, QR, Text Size, Voice Memos)
//
%hook CCUIButtonModuleView

- (void)layoutSubviews {
    %orig;
    applyIOS18PlatterStyle(self);
    
    for (UIView *subview in self.subviews) {
        applyIOS18PlatterStyle(subview);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect bounds = self.bounds;
    if (bounds.size.width > 0 && bounds.size.height > 0) {
        %orig(MIN(bounds.size.width, bounds.size.height) / 2.0f);
    } else {
        %orig(radius);
    }
}

%end

//
// Hook: CCUIRoundButton
// Round toggle buttons inside platters and standalone controls
//
%hook CCUIRoundButton

- (void)layoutSubviews {
    %orig;
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = MIN(self.bounds.size.width, self.bounds.size.height) / 2.0f;
    self.clipsToBounds = YES;
    
    UIView *bgView = nil;
    if ([self respondsToSelector:@selector(normalStateBackgroundView)]) {
        bgView = [self normalStateBackgroundView];
    }
    
    if (bgView) {
        bgView.layer.cornerCurve = kCACornerCurveContinuous;
        bgView.layer.cornerRadius = MIN(bgView.bounds.size.width, bgView.bounds.size.height) / 2.0f;
        bgView.clipsToBounds = YES;
    }
}

%end

//
// Hook: CCUIMenuModuleItemView
//
%hook CCUIMenuModuleItemView

- (void)layoutSubviews {
    %orig;
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = 16.0f;
    self.clipsToBounds = YES;
}

%end

//
// Hook: CCUIContinuousSliderView
// Redesigns Brightness and Volume sliders with iOS 18 thick rounded capsule styling
//
%hook CCUIContinuousSliderView

- (void)layoutSubviews {
    %orig;
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = kIOS18SliderCornerRadius;
    self.clipsToBounds = YES;
    
    if ([self respondsToSelector:@selector(valueIndicatorClippingView)]) {
        UIView *clippingView = [self valueIndicatorClippingView];
        if (clippingView) {
            clippingView.layer.cornerCurve = kCACornerCurveContinuous;
            clippingView.layer.cornerRadius = kIOS18SliderCornerRadius;
            clippingView.clipsToBounds = YES;
        }
    }
    
    if ([self respondsToSelector:@selector(backgroundView)]) {
        UIView *bg = [self backgroundView];
        if (bg) {
            bg.layer.cornerCurve = kCACornerCurveContinuous;
            bg.layer.cornerRadius = kIOS18SliderCornerRadius;
            bg.clipsToBounds = YES;
        }
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    %orig(kIOS18SliderCornerRadius);
}

%end

//
// Hook: CCUIModularControlCenterOverlayViewController
// Adds top Edit '+' and Power buttons to Control Center header
//
%hook CCUIModularControlCenterOverlayViewController

- (void)viewDidLoad {
    %orig;
    
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
    
    BOOL isGeneral = [controllerTitle isEqualToString:@"General"] || 
                     [specifierID isEqualToString:@"General"] || 
                     [self isKindOfClass:objc_getClass("GeneralController")];
                     
    if (isGeneral) {
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
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    
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

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    %orig(20.0f);
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
