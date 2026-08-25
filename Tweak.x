#import "Tweak.h"
#import <objc/runtime.h>

static const CGFloat kIOS18ModuleRadius = 26.0f;
static const CGFloat kIOS18SliderCornerRadius = 26.0f;
static const CGFloat kIOS18HeroCardHeight = 158.0f;

@implementation iOS18SettingsHeroCardView {
    UIVisualEffectView *_blurBackgroundView;
    UIImageView *_iconImageView;
    UILabel *_titleLabel;
    UILabel *_descriptionLabel;
}

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

%group ControlCenterHooks

%hook CCUIContentModuleContainerView

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
    
    if ([self respondsToSelector:@selector(backgroundMaterialView)]) {
        UIView *matView = [self backgroundMaterialView];
        if (matView) {
            matView.layer.cornerCurve = kCACornerCurveContinuous;
            matView.layer.cornerRadius = self.layer.cornerRadius;
            matView.clipsToBounds = YES;
        }
    }
}

%end

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

%hook CCUIRoundButton

- (void)layoutSubviews {
    %orig;
    
    self.layer.cornerCurve = kCACornerCurveContinuous;
    self.layer.cornerRadius = self.bounds.size.width / 2.0f;
    self.clipsToBounds = YES;
    
    if ([self respondsToSelector:@selector(normalStateBackgroundView)]) {
        UIView *bgView = [self normalStateBackgroundView];
        if (bgView) {
            bgView.layer.cornerCurve = kCACornerCurveContinuous;
            bgView.layer.cornerRadius = bgView.bounds.size.width / 2.0f;
            bgView.clipsToBounds = YES;
        }
    }
}

%end

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

%end

%end

%group SettingsHooks

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

%end

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

%end

%end

%ctor {
    @autoreleasepool {
        NSString *bundleID = [[NSBundle mainBundle] bundleIdentifier];
        
        if ([bundleID isEqualToString:@"com.apple.springboard"] || 
            [bundleID isEqualToString:@"com.apple.ControlCenterUI"]) {
            %init(ControlCenterHooks);
        }
        
        if ([bundleID isEqualToString:@"com.apple.Preferences"]) {
            %init(SettingsHooks);
        }
    }
}
